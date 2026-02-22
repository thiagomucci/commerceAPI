-- AlterTable
ALTER TABLE "user" ADD COLUMN     "deleteTime" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "user_deleteTime_idx" ON "user"("deleteTime");
