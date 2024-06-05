import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Spinner, Flex, Input, Select, useToast } from '@chakra-ui/react';

interface UserModalProps {
    isOpen: boolean;
    userId: number | null; // ID do usuário selecionado
    onClose: () => void; // Função para fechar o modal
    onUpdateUsers: () => void; // Função para atualizar a lista de usuários
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, userId, onClose, onUpdateUsers }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast(); // Usado para exibir o alerta

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token || !userId) {
                    return;
                }

                setLoading(true);
                const response = await axios.get(`https://unicap-events-backend.onrender.com/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Ocorreu um erro ao buscar detalhes do usuário:', error);
                setLoading(false);
            }
        };

        if (isOpen && userId) {
            fetchUser();
        }
    }, [isOpen, userId]);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token || !user) {
                return;
            }

            setLoading(true);
            await axios.put(`https://unicap-events-backend.onrender.com/user/${user.id}`, user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);
            toast({
                title: 'Usuário atualizado com sucesso!',
                description: "As alterações do usuário foram salvas.",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            onUpdateUsers(); // Chame a função para atualizar a lista de usuários
            onClose();
        } catch (error) {
            console.error('Ocorreu um erro ao salvar as alterações do usuário:', error);
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token || !user) {
                return;
            }

            setLoading(true);
            await axios.delete(`https://unicap-events-backend.onrender.com/user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);
            toast({
                title: 'Usuário excluído com sucesso!',
                description: "O usuário foi removido do sistema.",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            onUpdateUsers(); // Chame a função para atualizar a lista de usuários
            onClose();
        } catch (error) {
            console.error('Ocorreu um erro ao excluir o usuário:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Detalhes do Usuário</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {loading ? (
                        <Flex justify="center" align="center" height="60px">
                            <Spinner size="xl" color="red.500" />
                        </Flex>
                    ) : (
                        user ? (
                            <div>
                                <p><strong>Nome:</strong> <Input name="name" value={user.name} onChange={handleInputChange} marginTop="20px" /></p>
                                <p><strong>Email:</strong> <Input name="email" value={user.email} onChange={handleInputChange} marginTop="20px" /></p>
                                <p><strong>Telefone:</strong> <Input name="phone" value={user.phone} onChange={handleInputChange} marginTop="20px" /></p>
                                <p><strong>RA:</strong> <Input name="ra" value={user.ra} onChange={handleInputChange} marginTop="20px" /></p>
                                <p><strong>Tipo:</strong> <Select name="type" placeholder="Selecione o tipo" value={user.type} onChange={handleSelectChange} marginTop="20px">
                                    <option value="Estudante">Estudante</option>
                                    <option value="Professor">Professor</option>
                                    <option value="Participante">Participante </option>
                                </Select></p>
                                <p><strong>Permissão:</strong> <Select name="permission" placeholder="Permissão" value={user.permission} onChange={handleSelectChange} marginTop="20px">
                                    <option value="SuperAdmin">Super Administrador</option>
                                    <option value="Admin">Administrador</option>
                                    <option value="Participante">Participante</option>
                                </Select></p>
                            </div>
                        ) : (
                            <p>Erro ao carregar</p>
                        )
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='yellow' mr={3} onClick={onClose}>
                        Fechar
                    </Button>
                    <Button colorScheme='red' mr={3} onClick={handleDelete} isLoading={loading}>
                        Excluir
                    </Button>
                    <Button colorScheme='green' mr={3} onClick={handleSave} isLoading={loading}>
                        Salvar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default UserModal;
