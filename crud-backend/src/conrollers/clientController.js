import {
    createClient,
    updateClient,
    getAllClients,
    deleteClient,
    searchClients,
} from '../services/clientServices.js';

// Пример обработчика для создания клиента
export const createClientController = async (req, res) => {
    try {
        const { name, email, job, rate, isActive } = req.body;
        const newClient = await createClient({
            name,
            email,
            job,
            rate,
            isActive, // Передаем isActive
        });
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateClientController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, job, rate, isActive } = req.body;
        const updatedClient = await updateClient(id, {
            name,
            email,
            job,
            rate,
            isActive, // Передаем isActive
        });
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Пример обработчика для получения всех клиентов
export const getAllClientsController = async (req, res) => {
    try {
        const clients = await getAllClients();
        res.status(200).json(clients);  // Отправляем список всех клиентов
    } catch (error) {
        res.status(500).json({ error: "Error fetching all clients" });
    }
};

// Пример обработчика для удаления клиента
export const deleteClientController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClient = await deleteClient(parseInt(id));  // Преобразуем id в число
        res.json(deletedClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Функция для поиска клиентов по имени, email и работе
export const searchClientsController = async (req, res) => {
    try {
        const { searchTerm } = req.query; // Получаем поисковый запрос из параметров URL
        if (!searchTerm) {
            return res.status(400).json({ error: "Search term is required" });
        }
        const clients = await searchClients(searchTerm);
        res.status(200).json(clients);  // Отправляем результат поиска
    } catch (error) {
        res.status(500).json({ error: "Error searching clients" });
    }
};