type Rc4Iter = std::iter::Cycle<std::array::IntoIter<u8, 256_usize>>;

pub struct NcmRc4 {
    rc4_iter: Rc4Iter,
}

impl NcmRc4 {
    pub fn new(key: &[u8]) -> Self {
        let mut state = [0u8; 256];
        Self::ncm_prga(&mut state, &Self::ksa(key));
        let rc4_iter: Rc4Iter = state.into_iter().cycle();
        Self { rc4_iter }
    }

    pub fn decrypt(&self, buf: &mut [u8]) {
        buf.iter_mut()
            .zip(self.rc4_iter.clone())
            .for_each(|(byte, x)| *byte ^= x)
    }

    fn ksa(key: &[u8]) -> [u8; 256] {
        let mut state = [0; 256];

        state.iter_mut().enumerate().for_each(|(index, byte)| {
            *byte = index as u8;
        });

        let key_iter = key.iter().cycle();
        let mut j = 0u8;

        (0..=255).zip(key_iter).for_each(|(i, k)| {
            j = j.wrapping_add(state[i]).wrapping_add(*k);
            state.swap(i, j.into());
        });

        state
    }

    fn ncm_prga(state: &mut [u8; 256], ksa_key: &[u8; 256]) {
        (0..=255u8).for_each(|i| {
            let key1 = i.wrapping_add(1);
            let key2 = key1.wrapping_add(ksa_key[key1 as usize]);
            let index = ksa_key[key1 as usize].wrapping_add(ksa_key[key2 as usize]);
            state[i as usize] = ksa_key[index as usize];
        });
    }
}
