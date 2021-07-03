{
  todo: {
    validation: {
      [ ] FindUserByWallet *
      [*] Wallet validation 
    }
    wallet: {
      Registration: {
        [ ] Generate nonce * 
        [*] Unique Wallet Address
      }
      Login: {
        [ ] Check wallet
        [ ] Return nonce for signature
        [ ] Erecover signature
        [ ] Issue jwt or deny access
      }
    }
  }
  }