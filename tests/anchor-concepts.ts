import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AnchorConcepts } from "../target/types/anchor_concepts";
import { Proposals } from "./models/proposal_enum"

describe("anchor-concepts", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.AnchorConcepts as Program<AnchorConcepts>;

  const payer = anchor.web3.Keypair.generate();

  it("Is initialized first!", async () => {

    const airdrop_tx = await program.provider.connection.requestAirdrop(
      payer.publicKey,
      2000000000
    );
    
    // Add your test here.
    const initialize_tx = await program.rpc.initialize(
      {first: {}},
      {
        accounts: {
        payer: payer.publicKey,
        },
        signers:[ payer ]
      }
    );
    console.log("Your transaction signature", initialize_tx);
  });

  it("Is initialized second!", async () => {

    const airdrop_tx = await program.provider.connection.requestAirdrop(
      payer.publicKey,
      2000000000
    );

    const proposals = [{first: {}}, {second: {}}];
   
    const initialize_tx = await program.rpc.initialize(
      proposals[1],
      {
        accounts: {
        payer: payer.publicKey,
        },
        signers:[ payer ]
      }
    );
    console.log("Your transaction signature", initialize_tx);
  });

  it("Is initialized third!", async () => {

    const airdrop_tx = await program.provider.connection.requestAirdrop(
      payer.publicKey,
      2000000000
    );

    let proposals = new Map<string, Object>();
    proposals.set("third", {third: {}})

    const initialize_tx = await program.rpc.initialize(
      proposals.get("third"),
      {
        accounts: {
        payer: payer.publicKey,
        },
        signers:[ payer ]
      }
    );
    console.log("Your transaction signature", initialize_tx);
  });

});