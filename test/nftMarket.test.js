const NftMarket = artifacts.require('NftMarket');
const { ethers } = require('ethers');

contract('NftMarket', (accounts) => {
  let _contract = null;
  let _nftPrice = ethers.utils.parseEther('0.3').toString();

  before(async () => {
    _contract = await NftMarket.deployed();
  });

  describe('Mint token', () => {
    const tokenURI = 'https://test.pl';

    before(async () => {
      await _contract.mintToken(tokenURI, _nftPrice, {
        from: accounts[0],
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
  });
});
