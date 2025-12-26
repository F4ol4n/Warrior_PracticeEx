module practiceexercise::warrior_game {
    //Struct: Warrior with UID, level and exp.
    public struct Warrior has key, store {
        id: sui::object::UID,
        level: u8,
        exp: u64
    }

    //Function: Create Warrior (Minting a level 1 Warrior)
    public fun new(ctx: &mut sui::tx_context::TxContext) { //Mutable
        let new_warrior = Warrior {
            id: sui::object::new(ctx),
            level: 1,
            exp: 0
        };
        //Transfer ownership back to creator
        sui::transfer::public_transfer(new_warrior, sui::tx_context::sender(ctx));
    }

    //Function: Grind Exp 
    public fun train(w: &mut Warrior) {
        w.exp = w.exp + 10;
        //Leveling system
        if (w.exp >= 100) {
            w.level = w.level + 1;
            w.exp = 0;
        }
    }
}