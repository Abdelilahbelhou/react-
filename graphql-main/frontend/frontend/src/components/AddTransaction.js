import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const ADD_TRANSACTION = gql`
  mutation AddTransaction($transaction: TransactionRequest!) {
    addTransaction(transaction: $transaction) {
      id
      montant
      type
      date
    }
  }
`;

const AddTransaction = ({ compteId }) => {
  const [montant, setMontant] = useState("");
  const [type, setType] = useState("DEPOT");
  const [date, setDate] = useState("");

  const [addTransaction, { data, loading, error }] = useMutation(ADD_TRANSACTION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!montant || !date) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addTransaction({
        variables: {
          transaction: {
            compteId: parseInt(compteId, 10),
            montant: parseFloat(montant),
            date: date,
            type: type,
          },
        },
      });
      alert("Transaction added successfully!");
      setMontant("");
      setDate("");
      setType("DEPOT");
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  return (
    <TransactionContainer>
      <Title>Add Transaction</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Montant:</Label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Date:</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Type:</Label>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="DEPOT">Dépot</option>
            <option value="RETRAIT">Retrait</option>
          </Select>
        </FormGroup>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Transaction"}
        </SubmitButton>
      </Form>
      {error && <ErrorMessage>Error: {error.message}</ErrorMessage>}
      {data && <SuccessMessage>Transaction added successfully!</SuccessMessage>}
    </TransactionContainer>
  );
};

// Styled Components

const TransactionContainer = styled.div`
  max-width: 500px;
  margin: 30px auto;
  padding: 30px;
  background: linear-gradient(135deg, #e1e9f1, #ffffff);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 25px;
  font-size: 24px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #34495e;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #dcdde1;
  font-size: 16px;
  background-color: #ffffff;
  transition: border-color 0.3s;

  &:focus {
    border-color: #6498db;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #dcdde1;
  font-size: 16px;
  background-color: #ffffff;
  transition: border-color 0.3s;

  &:focus {
    border-color: #6898db;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 14px;
  background-color: #6898db;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #8541b9;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #19270a;
    transform: translateY(0);
  }

  &:disabled {
    background-color: #d0d0d0;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #e74c3c;
  text-align: center;
  font-weight: bold;
`;

const SuccessMessage = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #27ae60;
  text-align: center;
  font-weight: bold;
`;

export default AddTransaction;
