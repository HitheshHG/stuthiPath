import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nsgorhtksdayaaxioxue.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZ29yaHRrc2RheWFheGlveHVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2ODk1ODEsImV4cCI6MjA3MzI2NTU4MX0.2U-FnG-vppxpSY-qyygMQ1_SCVe4sGRmQw5GJbGMizU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
