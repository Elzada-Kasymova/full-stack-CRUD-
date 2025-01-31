import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Функция для создания нового клиента
export const createClient = async (data) => {
    try {
        const client = await prisma.client.create({
            data: {
                name: data.name,
                email: data.email,
                job: data.job,
                rate: data.rate,
                isActive: data.isActive, // Явно указываем isActive
            },
        });
        console.log('Client added:', client);
        return client;
    } catch (error) {
        throw new Error('Error adding client: ' + error.message);
    }
};

// Функция для обновления данных клиента
// Пример функции обновления клиента
export const updateClient = async (id, data) => {
    try {
        const updatedClient = await prisma.client.update({
            where: {
                id: parseInt(id), // Преобразуем id в число
            },
            data: {
                name: data.name,
                email: data.email,
                job: data.job,
                rate: data.rate,
                isActive: data.isActive, // Явно указываем isActive
            },
        });
        return updatedClient;
    } catch (error) {
        throw new Error('Error updating client: ' + error.message);
    }
};


// Функция для получения всех клиентов
export const getAllClients = async () => {
    try {
        const clients = await prisma.client.findMany();
        return clients;
    } catch (error) {
        console.error("Error fetching all clients:", error);
        throw error;
    }
};

// Функция для удаления клиента по ID
export const deleteClient = async (id) => {
    try {
        const deletedClient = await prisma.client.delete({
            where: {
                id: parseInt(id),  // Преобразуем id в число
            },
        });
        return deletedClient;
    } catch (error) {
        console.error("Error deleting client:", error);
        throw error;
    }
};

export const searchClients = async (searchTerm) => {
    try {
        const clients = await prisma.client.findMany({
            where: {
                OR: [
                    { name: { contains: searchTerm, mode: 'insensitive' } },
                    { email: { contains: searchTerm, mode: 'insensitive' } },
                    { job: { contains: searchTerm, mode: 'insensitive' } },
                ],
            },
        });
        return clients;
    } catch (error) {
        console.error("Error searching clients:", error);
        throw error;
    }
};

