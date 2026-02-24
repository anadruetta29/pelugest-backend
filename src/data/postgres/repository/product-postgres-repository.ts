import { prisma } from "../../../app"; 
import { ProductEntity } from "../../../common";
import { ProductEntityMapper } from "../mapper/product-entity-mapper";

export class ProductPostgresRepository {
    
    async create(productEntity: ProductEntity): Promise<ProductEntity | null> {

        const data = ProductEntityMapper.toModel(productEntity);

        const productModel = await prisma.product.create({
            data: {
                id: data.id,
                name: data.name,
                price: data.price,
                status: {
                    connect: { id: data.id_record_status }
                }
            },
            include: {
                status: true
            }
        });

        return ProductEntityMapper.toDomain(productModel);
    }

    async update(productEntity: ProductEntity): Promise<ProductEntity | null> {
        const data = ProductEntityMapper.toModel(productEntity);

        const productModel = await prisma.product.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                price: data.price,
                status: {
                    connect: { id: data.id_record_status }
                }
            },
            include: {
                status: true
            }
        });

        return ProductEntityMapper.toDomain(productModel);
    }

    async delete(id: string): Promise<ProductEntity | null> {
        const productModel = await prisma.product.update({
            where: { id },
            data: {
                status: {
                    connect: { id: 'DELETED' } 
                }
            },
            include: {
                status: true
            }
        });

        return ProductEntityMapper.toDomain(productModel);
    }

    async findById(id: string): Promise<ProductEntity | null> {
        const productModel = await prisma.product.findUnique({
            where: { id },
            include: { 
                status: true 
            }
        });
    
        return ProductEntityMapper.toDomain(productModel);
    }

}