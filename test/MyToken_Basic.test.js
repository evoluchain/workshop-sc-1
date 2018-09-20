import decodeLogs from './helpers/decodeLogs';
const MyToken = artifacts.require('MyToken');
const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('MyToken', ([_, creator, recipient, anotherAccount]) => {
  let token;
  
  beforeEach(async function () {
    token = await MyToken.new({ from: creator });
  });

  it.skip('has a name', async function () {
    const name = await token.name();
    assert.equal(name, 'MyToken');
  });

  it.skip('has a symbol', async function () {
    const symbol = await token.symbol();
    assert.equal(symbol, 'FailSymbol');
  });

  it.skip('has 18 decimals', async function () {
    const decimals = await token.decimals();
    assert(decimals.eq(18), 'Bad decimals');
  });

  it.skip('total supply is 42M tokens', async function () {
    const TOTAL_SUPPLY = new BigNumber((42 * 10 ** 6) * (10 ** 18)); // 42M
    const totalSupply = await token.totalSupply();
    totalSupply.should.bignumber.equal(TOTAL_SUPPLY);
  });

  it.skip('assigns the initial total supply to the creator', async function () {
    const totalSupply = await token.totalSupply();
    const creatorBalance = await token.balanceOf(creator);

    creatorBalance.should.bignumber.equal(totalSupply);

    const receipt = web3.eth.getTransactionReceipt(token.transactionHash);
    const logs = decodeLogs(receipt.logs, MyToken, token.address);
    assert.equal(logs.length, 1);
    assert.equal(logs[0].event, 'Transfer');
    assert.equal(logs[0].args.from.valueOf(), 0x0);
    assert.equal(logs[0].args.to.valueOf(), creator);
    logs[0].args.value.should.bignumber.equal(totalSupply);
  });

  it.skip('balanceOf account whithout tokens returns zero', async function () {
    const balance = await token.balanceOf(anotherAccount);
    balance.should.bignumber.equal(0);
  });

  it.skip('transfers the requested amount', async function () {
    const amount = new BigNumber(100 * 10 ** 18);
    await token.transfer(recipient, amount, { from: creator });

    const senderBalance = await token.balanceOf(creator);
    senderBalance.should.bignumber.equal(TOTAL_SUPPLY.sub(amount));

    const recipientBalance = await token.balanceOf(recipient);
    recipientBalance.should.bignumber.equal(amount);
  });

  it.skip('emits a transfer event', async function () {
    const amount = new BigNumber(100 * 10 ** 18);
    const { logs } = await token.transfer(recipient, amount, { from: creator });

    assert.equal(logs.length, 1);
    assert.equal(logs[0].event, 'Transfer');
    assert.equal(logs[0].args.from, creator);
    assert.equal(logs[0].args.to, recipient);
    assert(logs[0].args.value.eq(amount));
  });

  it.skip('approves the requested amount', async function () {
    const spender = recipient;
    const amount = new BigNumber(100 * 10 ** 18);
    await token.approve(spender, amount, { from: creator });

    const allowance = await token.allowance(creator, spender);
    allowance.should.bignumber.equal(amount);
  });

  it.skip('transfers the requested amount', async function () {
    const spender = recipient;
    const to = anotherAccount;
    const amount = new BigNumber(100 * 10 ** 18);
    await token.approve(spender, amount, { from: creator });
    await token.transferFrom(creator, to, amount, { from: spender });

    const recipientBalance = await token.balanceOf(to);
    recipientBalance.should.bignumber.equal(amount);
  });
});
