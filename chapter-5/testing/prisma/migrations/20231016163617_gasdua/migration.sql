-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
