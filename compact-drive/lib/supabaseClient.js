import { createClient } from '@supabase/supabase-js';

// ÎNLOCUIEȘTE CU DATELE TALE DE LA SUPABASE
const supabaseUrl = 'https://rptzbebrrdxrszaxuztb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwdHpiZWJycmR4cnN6YXh1enRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTc2NzQsImV4cCI6MjA3OTgzMzY3NH0.AJVpyMz3KL2E9zD614mCgQxeIsq-FSzE34AOj0t_54Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);