import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMPTE } from '../graphql/mutations';
import styled from 'styled-components';

const AddCompte = () => {
    const [formData, setFormData] = useState({
        solde: 0,
        dateCreation: '',
        type: 'COURANT',
    });

    const [createCompte, { error }] = useMutation(CREATE_COMPTE);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCompte({ variables: { compte: formData } });
            alert('Compte created successfully!');
            setFormData({ solde: 0, dateCreation: '', type: 'COURANT' }); // Reset form
        } catch (err) {
            alert('Failed to create compte. Please try again.');
        }
    };

    return (
        <FormContainer>
            <Title>Add Compte</Title>
            <form onSubmit={handleSubmit}>
                <FormField>
                    <Label htmlFor="solde">Solde</Label>
                    <Input
                        type="number"
                        name="solde"
                        id="solde"
                        placeholder="Enter solde"
                        value={formData.solde}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label htmlFor="dateCreation">Date de Création</Label>
                    <Input
                        type="date"
                        name="dateCreation"
                        id="dateCreation"
                        value={formData.dateCreation}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label htmlFor="type">Type de Compte</Label>
                    <Select
                        name="type"
                        id="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="COURANT">Courant</option>
                        <option value="EPARGNE">Epargne</option>
                    </Select>
                </FormField>

                <Button type="submit">Create</Button>
                {error && <ErrorMessage>Failed to create compte: {error.message}</ErrorMessage>}
            </form>
        </FormContainer>
    );
};

// Styled Components

const FormContainer = styled.div`
  max-width: 480px;
  margin: 40px auto;
  padding: 30px;
  background: linear-gradient(135deg, #f3f4f6, #ffffff);
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
  font-size: 26px;
  font-weight: 600;
`;

const FormField = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #34495e;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: 1px solid #ced6e0;
  border-radius: 8px;
  background-color: #ffffff;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #9998db;
    box-shadow: 0 0 0 2px rgba(72, 052, 219, 0.3);
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: 1px solid #ced6e0;
  border-radius: 8px;
  background-color: #ffffff;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #9998db;
    box-shadow: 0 0 0 2px rgba(92, 852, 219, 0.3);
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #9222db;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #9980b9;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #ac598a;
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #e74c3c;
  text-align: center;
  font-weight: bold;
`;

export default AddCompte;
