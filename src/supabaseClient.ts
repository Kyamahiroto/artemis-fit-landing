import { createClient } from '@supabase/supabase-js';

// Utilizando a chave publicável fornecida. Estas chaves são projetadas para estarem no front-end.
export const supabaseUrl = 'https://nyytfhdsybxoovxmeffr.supabase.co';
export const supabaseKey = 'sb_publishable_f09s_K7MIvdEHlCyyHDiXg_boZdWC3z';

export const supabase = createClient(supabaseUrl, supabaseKey);
