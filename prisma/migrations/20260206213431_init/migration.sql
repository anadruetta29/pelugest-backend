-- CreateTable
CREATE TABLE "service_product_requirements" (
    "id" TEXT NOT NULL,
    "standardAmountMl" INTEGER NOT NULL,
    "id_service" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,

    CONSTRAINT "service_product_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedDurationMin" INTEGER NOT NULL,
    "basePrice" DECIMAL(65,30) NOT NULL,
    "id_record_status" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_products" (
    "id" TEXT NOT NULL,
    "currentAmountMl" INTEGER NOT NULL,
    "minimumStockMl" INTEGER NOT NULL,
    "id_product" TEXT NOT NULL,

    CONSTRAINT "stock_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "id_record_status" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_products_id_product_key" ON "stock_products"("id_product");

-- AddForeignKey
ALTER TABLE "service_product_requirements" ADD CONSTRAINT "service_product_requirements_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_product_requirements" ADD CONSTRAINT "service_product_requirements_id_service_fkey" FOREIGN KEY ("id_service") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_id_record_status_fkey" FOREIGN KEY ("id_record_status") REFERENCES "record_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_products" ADD CONSTRAINT "stock_products_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id_record_status_fkey" FOREIGN KEY ("id_record_status") REFERENCES "record_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
