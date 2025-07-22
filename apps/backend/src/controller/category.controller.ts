// src/controllers/categories.ts
import { Request, Response } from 'express';
import { db } from '../db/connection';
import { products, categories } from '../db/schema';
import { eq } from 'drizzle-orm';


// Obtener todas las géneros
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await db.select().from(categories);
    res.json(allCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las géneros' });
  }
};

// Crear una nueva género
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await db.insert(categories).values({ name });
    res.status(201).json({ message: 'género creado', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la género' });
  }
};

// Actualizar una género existente
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await db
      .update(categories)
      .set({ name })
      .where(eq(categories.id, Number(id)));
    res.json({ message: 'género actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la género' });
  }
};

// Eliminar una género
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    const productos = await db
      .select()
      .from(products)
      .where(eq(products.category_id, id));

    if (productos.length > 0) {
      res.status(400).json({ message: "Juegos asociados con género" });
      return;
    }

    await db.delete(categories).where(eq(categories.id, id));
    res.json({ message: "género eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno" });
  }
};
