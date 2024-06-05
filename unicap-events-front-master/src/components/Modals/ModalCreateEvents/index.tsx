import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Spinner, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';

interface ModalCreateEventsProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdateEvents: () => void; // Função para atualizar a lista de eventos após a criação
}

const ModalCreateEvents: React.FC<ModalCreateEventsProps> = ({ isOpen, onClose, onUpdateEvents }) => {
    const initialFormData = {
        name: '',
        description: '',
        start_date: '',
        end_date: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento do botão
    const toast = useToast(); // Usado para exibir o alerta

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:00`;
    };

    const handleSubmit = async () => {
        try {
            setLoading(true); // Define o estado de loading como true
            const token = localStorage.getItem('accessToken');
            if (!token) {
                // Lógica para lidar com a falta de token
                return;
            }

            // Formatar as datas para o formato esperado pela API (YYYY-MM-DD HH:MM:SS)
            const formattedFormData = {
                ...formData,
                start_date: formatDateTime(formData.start_date), 
                end_date: formatDateTime(formData.end_date),
            };

            const response = await axios.post(`https://unicap-events-backend.onrender.com/event/`, formattedFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Evento criado com sucesso:', response.data);
            resetForm(); // Chama a função para redefinir os campos do formulário
            onUpdateEvents(); // Atualiza a lista de eventos após a criação do evento
            toast({
                title: 'Evento criado com sucesso!',
                description: "O evento foi adicionado com sucesso.",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            onClose(); // Fecha o modal após a criação do evento
        } catch (error) {
            console.error('Ocorreu um erro ao criar o evento:', error);
            // Lógica para lidar com o erro de criação do evento
        } finally {
            setLoading(false); // Define o estado de loading como false após o envio do evento (seja sucesso ou erro)
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar Evento</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input name="name" placeholder="Nome do evento" value={formData.name} onChange={handleInputChange} marginTop="20px" />
                    <Input name="description" placeholder="Descrição do evento" value={formData.description} onChange={handleInputChange} marginTop="20px" />
                    <FormControl marginTop="20px">
                        <FormLabel>Data e Hora Inicial</FormLabel>
                        <Input name="start_date" type="datetime-local" value={formData.start_date} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl marginTop="20px">
                        <FormLabel>Data e Hora Final</FormLabel>
                        <Input name="end_date" type="datetime-local" value={formData.end_date} onChange={handleInputChange} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme="green" onClick={handleSubmit} isLoading={loading}>
                        {loading ? <Spinner size="sm" color="yellow" /> : "Adicionar"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalCreateEvents;
