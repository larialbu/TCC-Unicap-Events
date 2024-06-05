import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Spinner, Select, useToast } from '@chakra-ui/react';
import axios from 'axios';

interface ModalCreateUserProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdateUsers: () => void; // Adicione esta linha
}

const ModalCreateUser: React.FC<ModalCreateUserProps> = ({ isOpen, onClose, onUpdateUsers }) => {
    const initialFormData = {
        name: '',
        email: '',
        password: '',
        confirm_password: "",
        ra: '',
        phone: '',
        type: '',
        permission: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return;
            }

            const response = await axios.post('https://unicap-events-backend.onrender.com/user/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Usuário criado com sucesso:', response.data);
            toast({
                title: 'Usuário criado com sucesso!',
                description: "O usuário foi criado e adicionado ao sistema.",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            resetForm();
            onUpdateUsers(); // Chame a função para atualizar a lista de usuários
            onClose();
        } catch (error) {
            console.error('Ocorreu um erro ao criar o usuário:', error);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar Usuário</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input name="name" placeholder="Nome" value={formData.name} onChange={handleInputChange} marginTop="20px" />
                    <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} marginTop="20px" />
                    <Input name="password" type="password" placeholder="Senha" value={formData.password} onChange={handleInputChange} marginTop="20px" />
                    <Input name="confirm_password" type="password" placeholder="Confirmar senha" value={formData.confirm_password} onChange={handleInputChange} marginTop="20px" />
                    <Input name="ra" placeholder="RA" value={formData.ra} onChange={handleInputChange} marginTop="20px" />
                    <Input name="phone" placeholder="Telefone" value={formData.phone} onChange={handleInputChange} marginTop="20px" />
                    <Select name="type" placeholder="Selecione o tipo" value={formData.type} onChange={handleInputChange} marginTop="20px">
                        <option value="Estudante">Estudante</option>
                        <option value="Professor">Professor</option>
                        <option value="Participante">Participante</option>
                    </Select>
                    <Select name="permission" placeholder="Permissão" value={formData.permission} onChange={handleInputChange} marginTop="20px">
                        <option value="Super Admin">Super Administrador</option>
                        <option value="Admin">Administrador</option>
                        <option value="Participante">Participante</option>
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme="green" onClick={handleSubmit} isLoading={loading}>
                        {loading ? <Spinner size="sm" color="red" /> : "Adicionar"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalCreateUser;
