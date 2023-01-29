use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = payer,
        space = 12,
        seeds = [b"counter"],
        bump,
    )]
    pub counter: Box<Account<'info, Counter>>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Read<'info> {
    ///CHECK:
    pub address_lookup_table: AccountInfo<'info>,
}

#[program]
pub mod anchor_concepts {

    use super::*;

    pub fn initialize_counter(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 1;

        Ok(())
    }

    pub fn read(ctx: Context<Read>) -> Result<()> {
        let alt = &mut ctx.accounts.address_lookup_table;

        Ok(())
    }
}

#[account]
pub struct Counter {
    pub count: u32,
}
