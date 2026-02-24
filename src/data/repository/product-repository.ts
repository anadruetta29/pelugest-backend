import { RecordStatus } from './../../../generated/prisma/client';
import { Client, Product } from './../../../node_modules/.prisma/client/index.d';
import { prisma } from "../../app";
import { ProductEntity, RecordStatusEntity } from "../../common";
import { ProductEntityMapper, ProductModel } from '../postgres/mapper/product-entity-mapper';
import { ProductRepositoryI } from '../../domain/repository/product-repository-interface';

export class ProductRepository implements ProductRepositoryI {

    async findById(id: string): Promise<ProductEntity | null> {
        const model = await prisma.product.findUnique({
            where: { id },
            include: { status: true }
        });

        return ProductEntityMapper.toDomain(model as ProductModel);
    }

    async save(product: ProductEntity): Promise<ProductEntity> {
        const model = ProductEntityMapper.toModel(product);
        
        const saved = await prisma.product.create({
            data: {
                id: model.id,
                name: model.name,
                price: model.price,
                status: { connect: { id: model.id_record_status } }
            },
            include: { status: true }
        });

        return ProductEntityMapper.toDomain(saved as ProductModel)!;
    }

    async update(product: ProductEntity): Promise<ProductEntity> {
        const model = ProductEntityMapper.toModel(product);
        
        const updated = await prisma.product.update({
            where: { id: model.id },
            data: {
                name: model.name,
                price: model.price,
                id_record_status: model.id_record_status
            },
            include: { status: true }
        });

        return ProductEntityMapper.toDomain(updated as ProductModel)!;
    }

    async delete(productId: string): Promise<void> {
        await prisma.product.delete({
            where: { id: productId }
        });
    }

    async getAll(): Promise<ProductEntity[]> {
        const models = await prisma.product.findMany({
            include: { status: true }
        });

        return ProductEntityMapper.toDomainList(models as ProductModel[]);
    }

    async getAllByStatus(statusId: string): Promise<ProductEntity[]> {
        const models = await prisma.product.findMany({
            where: { id_record_status: statusId },
            include: { status: true }
        });
        
        return ProductEntityMapper.toDomainList(models as ProductModel[]);
    }

    async deactivate(id: string): Promise<ProductEntity> {
        const model = await prisma.product.update({
            where: { id },
            data: {
                status: {
                    connect: { name: "INACTIVE" }
                }
            },
            include: { status: true }
        });

        return ProductEntityMapper.toDomain(model as ProductModel)!;
    }

}