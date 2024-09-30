import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('photovoltaic_projects')  // Nom de la table dans la DB
export class Project {
    @PrimaryGeneratedColumn()  // ID auto-généré
    id: number;

    @Column()  // Colonne de type string
    name: string;

    @Column()  // Colonne de type string
    address: string;

    @CreateDateColumn()  // Colonne auto-générée lors de la création
    createdAt: Date;

    @UpdateDateColumn()  // Colonne auto-générée lors de chaque mise à jour
    updatedAt: Date;
}
