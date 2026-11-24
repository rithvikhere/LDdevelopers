-- =============================================================================
-- [COMPANY NAME] CONSTRUCTION & PROPERTY DEVELOPMENT PLATFORM
-- 002 — PUBLIC ENQUIRIES FROM THE HOMEPAGE FORM
-- =============================================================================
-- The homepage enquiry desk is used by visitors who are not signed in, so their
-- enquiries have no linked account. Before this migration such inserts failed:
-- user_id was NOT NULL and the only insert policy was for signed-in customers.

-- 1. Enquiries submitted without an account have no user
ALTER TABLE public.enquiries ALTER COLUMN user_id DROP NOT NULL;

-- 2. Anyone (signed out, or signed in using the public form) may submit a new,
--    unassigned enquiry. They cannot read, update or delete enquiries; admins see
--    these rows through the existing "Admins can view all enquiries" policy.
DROP POLICY IF EXISTS "Anyone can submit a public enquiry" ON public.enquiries;
CREATE POLICY "Anyone can submit a public enquiry"
  ON public.enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (user_id IS NULL AND status = 'new');
