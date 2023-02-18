const NftMarket = artifacts.require('NftMarket');
const { ethers } = require('ethers');

contract('NftMarket', (accounts) => {
  let _contract = null;
  let _nftPrice = ethers.utils.parseEther('0.3').toString();
  let _listingPrice = ethers.utils.parseEther('0.025').toString();

  before(async () => {
    _contract = await NftMarket.deployed();
  });

  describe('Mint token', () => {
    const tokenURI = 'https://test.pl';

    before(async () => {
      await _contract.mintToken(tokenURI, _nftPrice, {
        from: accounts[0],
        value: _listingPrice,
      });
    });

    // message if everything is ok
    it('owner of first token should be address[0]', async () => {
      const owner = await _contract.ownerOf(1);
      //  owner === accounts[0], 3rd arg: failure message
      assert.equal(owner, accounts[0], 'Owner of token is not matching address[0]');
    });

    it('first token should point to the correct tokenURI', async () => {
      const actualTokenURI = await _contract.tokenURI(1);
      assert.equal(actualTokenURI, tokenURI, 'tokenURI is not correctly set');
    });

    it('should not be possible to create a NFT whit used tokenURI', async () => {
      try {
        await _contract.mintToken(tokenURI, _nftPrice, {
          from: accounts[0],
        });
      } catch (error) {
        assert(error, 'NFT was winted with previously used tokenURI');
      }
    });

    it('should have one listed item', async () => {
      const listedItem = await _contract.listedItemsCount();
      assert.equal(listedItem, 1, 'Listed items count is not 1');
    });

    it('should have create NFT item', async () => {
      const nftItem = await _contract.getNftItem(1);
      assert.equal(nftItem.tokenId, 1, 'Token id is not 1');
      assert.equal(nftItem.price, _nftPrice, 'Nft price is not correct');
      assert.equal(nftItem.creator, accounts[0], 'creator is not aacounts[0]');
      assert.equal(nftItem.isListed, true, 'Token is not listed');
    });
  });

  describe('Buy NFT', () => {
    before(async () => {
      await _contract.buyNft(1, {
        from: accounts[1],
        value: _nftPrice,
      });
    });

    it('should unlist the item', async () => {
      const listedItem = await _contract.getNftItem(1);
      assert.equal(listedItem.isListed, false, 'Item is still listed');
    });

    it('should decrease listed items count', async () => {
      const listedItemCount = await _contract.listedItemsCount();
      assert.equal(listedItemCount.toNumber(), 0, 'Count has not been decrement');
    });

    it('should change the owner', async () => {
      const currentOwner = await _contract.ownerOf(1);
      assert.equal(currentOwner, accounts[1], 'Owner does not changed');
    });
  });

  describe('Token transfers', () => {
    const tokenURI = 'https://test-json-2.com';

    before(async () => {
      await _contract.mintToken(tokenURI, _nftPrice, {
        from: accounts[0],
        value: _listingPrice,
      });
    });

    it('should have two NFTs created', async () => {
      const totalSupply = await _contract.totalSupply();
      // totalSupply.toNumber() - because we retrieve BigNumber type from _contract
      assert.equal(totalSupply.toNumber(), 2, 'Total supply of token is not correct');
    });

    it('should be able to retreive NFT by index', async () => {
      const nftId1 = await _contract.tokenByIndex(0);
      const nftId2 = await _contract.tokenByIndex(1);

      assert.equal(nftId1.toNumber(), 1, 'NFT id is wrong');
      assert.equal(nftId2.toNumber(), 2, 'NFT id is wrong');
    });

    it('should have one listed NFT', async () => {
      const allNfts = await _contract.getAllNftsOnSale();
      assert.equal(allNfts[0].tokenId, 2, 'NFT has a wrong id');
    });

    it('account[1] should have one owned NFT', async () => {
      const ownedNfts = await _contract.getOwnedNfts({ from: accounts[1] });
      assert.equal(ownedNfts[0].tokenId, 1, 'NFT has a wrong id');
    });
  });

  describe('Token transfer to new owner', async () => {
    before(async () => {
      await _contract.transferFrom(accounts[0], accounts[1], 2);
    });

    it('accounts[0] should own 0 tokens', async () => {
      const ownedNfts = await _contract.getOwnedNfts({ from: accounts[0] });
      assert.equal(ownedNfts.length, 0, 'Invalid length of tokens');
    });
  });

  describe('Burn token', async () => {
    const tokenURI = 'https://test-json3.pl';

    before(async () => {
      await _contract.mintToken(tokenURI, _nftPrice, {
        from: accounts[2],
        value: _listingPrice,
      });
    });

    it('account[2] should have one owned NFT', async () => {
      const ownedNfts = await _contract.getOwnedNfts({ from: accounts[2] });
      assert.equal(ownedNfts[0].tokenId, 3, 'Nft has a wrong id');
    });

    it('account[2] should have one owned NFT', async () => {
      const ownedNfts = await _contract.getOwnedNfts({ from: accounts[2] });
      assert.equal(ownedNfts[0].tokenId, 3, 'Nft has a wrong id');
    });
  });
});
