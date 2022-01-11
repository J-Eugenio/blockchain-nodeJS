import { Block } from '../block';

class Blockchain {
  public chain:Array<Block>;

  //Inicia a chain com o bloco genesis
  constructor(){
    this.chain = [Block.genesis()];
  }

  //Adiciona um novo bloco
  addBlock(data: any){
    const lastBlock = this.chain.slice(-1)[0];
    const block = Block.mineBlock(lastBlock, data);
    this.chain.push(block);

    return block;
  }

  //Verifica se a chain e valida
  //(Se o primeiro bloco e o genesis, se o lastHash correspondem ao bloco anterior, se o hash do bloco atual e valido)
  isValidChain(chain: Array<Block>): Boolean{
    
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
      return false;
    }

    for(let i = 1; i < chain.length; i++){
      const block = chain[i];
      const lastBlock = chain[i-1];

      if(block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)){
        return false;
      }
    }

    return true;
  }

  //Atualiza as ramificacoes da chain com o maior bloco
  replaceChain(newChain: Array<Block>) {

    if(newChain.length <= this.chain.length){
      console.log('Receive chain is not longer than the current chain');
      return;
    } else if(!this.isValidChain(newChain)){
      console.log('The received chain is not valid')
      return
    }

    console.log('Replacing blockchain with the new chain');
    this.chain = newChain;
  }

}

export { Blockchain }