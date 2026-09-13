import { prisma } from '@/lib/prisma';

export const todoRepository = {
  findManyByUserId: async (userId: string) => {
    return await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  create: async (text: string, userId: string) => {
    return await prisma.todo.create({
      data: { text, userId },
    });
  },

  updateStatus: async (id: string, isCompleted: boolean, userId: string) => {
    return await prisma.todo.update({
      where: { id, userId },
      data: { isCompleted },
    });
  },

  deleteById: async (id: string, userId: string) => {
    return await prisma.todo.delete({
      where: { id, userId },
    });
  },
};
