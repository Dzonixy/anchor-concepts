import * as anchor from "@project-serum/anchor";
import { Program, web3 } from "@project-serum/anchor";
import TransactionFactory from "@project-serum/anchor/dist/cjs/program/namespace/transaction";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { AnchorConcepts } from "../target/types/anchor_concepts";

describe("anchor-concepts", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const connection = anchor.getProvider().connection;

  const program = anchor.workspace.AnchorConcepts as Program<AnchorConcepts>;

  it("Is initialized!", async () => {
    const payer = new Keypair();

    await connection.confirmTransaction(
      await connection.requestAirdrop(payer.publicKey, 10 * LAMPORTS_PER_SOL)
    );

    const [counter, _] = PublicKey.findProgramAddressSync(
      [Buffer.from("counter")],
      program.programId
    );

    await program.methods
      .initializeCounter()
      .accounts({
        counter,
        payer: payer.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([payer])
      .rpc();

    // connect to a cluster and get the current `slot`
    const slot = await connection.getSlot();

    // Assumption:
    // `payer` is a valid `Keypair` with enough SOL to pay for the execution

    const [lookupTableInst, lookupTableAddress] =
      web3.AddressLookupTableProgram.createLookupTable({
        authority: payer.publicKey,
        payer: payer.publicKey,
        recentSlot: slot,
      });

    // add addresses to the `lookupTableAddress` table via an `extend` instruction
    const extendInstruction = web3.AddressLookupTableProgram.extendLookupTable({
      payer: payer.publicKey,
      authority: payer.publicKey,
      lookupTable: lookupTableAddress,
      addresses: [
        payer.publicKey,
        web3.SystemProgram.programId,
        // list more `publicKey` addresses here
      ],
    });

    let tx = new TransactionFactory();

    // get the table from the cluster
    const lookupTableAccount = await connection
      .getAddressLookupTable(lookupTableAddress)
      .then((res) => res.value);

    console.log(
      "Table address from cluster:",
      lookupTableAccount.key.toBase58()
    );

    // Assumptions:
    // - `arrayOfInstructions` has been created as an `array` of `TransactionInstruction`
    // - we are are using the `lookupTableAccount` obtained above

    // // construct a v0 compatible transaction `Message`
    // const messageV0 = new web3.TransactionMessage({
    //   payerKey: payer.publicKey,
    //   recentBlockhash: blockhash,
    //   instructions: arrayOfInstructions, // note this is an array of instructions
    // }).compileToV0Message([lookupTableAccount]);

    // // create a v0 transaction from the v0 message
    // const transactionV0 = new web3.VersionedTransaction(messageV0);

    // // sign the v0 transaction using the file system wallet we created named `payer`
    // transactionV0.sign([payer]);

    // // send and confirm the transaction
    // // (NOTE: There is NOT an array of Signers here; see the note below...)
    // const txid = await web3.sendAndConfirmTransaction(
    //   connection,
    //   transactionV0
    // );
  });
});
