use anchor_lang::prelude::{
    borsh::{BorshDeserialize, BorshSchema, BorshSerialize},
    *,
};

mod instructions;
use instructions::*;

declare_id!("3cDr45cDkpJs1isef7ZCNmnED89MupjBZjX9FRmBtVdq");

#[derive(Accounts)]
pub struct Initialize<'info> {
    pub payer: Signer<'info>,
}

#[program]
pub mod anchor_concepts {

    use super::*;

    pub fn initialize(_ctx: Context<Initialize>, proposal: Proposals) -> Result<()> {
        match proposal {
            Proposals::First => print_first(),
            Proposals::Second => print_second(),
            Proposals::Third => print_third(),
            Proposals::Fourth => print_fourth(),
            Proposals::Fifth => print_fifth(),
        }
        Ok(())
    }
}

#[derive(Debug, BorshSchema, BorshSerialize, BorshDeserialize, Clone, Copy)]
pub enum Proposals {
    First,
    Second,
    Third,
    Fourth,
    Fifth,
}
