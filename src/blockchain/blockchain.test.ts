import { Block } from '../block';
import { Blockchain } from './';

describe('Blockchain', () => {
  let blockchain: Blockchain;
  let blockchain2: Blockchain;

  beforeEach(() => {
    blockchain = new Blockchain;
    blockchain2 = new Blockchain;
  });

  it('starts witch genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block', () => {
    const data = 'file.pdf';
    blockchain.addBlock(data);

    expect(blockchain.chain.slice(-1)[0].data).toEqual(data)
  });

  it('validates a valid chain', () => {
    blockchain2.addBlock('500U$');

    expect(blockchain.isValidChain(blockchain2.chain)).toBe(true)
  });

  it('invalidates a chain with a corrupt genesis block', () => {
    blockchain2.chain[0].data = '0U$';
    expect(blockchain.isValidChain(blockchain2.chain)).toBe(false)
  });

  it('invalidates a corrupt chain', () => {
    blockchain2.addBlock('200U$');
    blockchain2.chain[1].data = '0U$';

    expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it('replaces the chain with a valid chain', () => {

    blockchain2.addBlock('600U$')
    blockchain.replaceChain(blockchain2.chain);

    expect(blockchain.chain).toEqual(blockchain2.chain)
  });

  it('does not replace the chain with one of less or equal length', () => {
    blockchain.addBlock('200U$');
    blockchain.replaceChain(blockchain2.chain);

    expect(blockchain.chain).not.toEqual(blockchain2.chain)
  });
})