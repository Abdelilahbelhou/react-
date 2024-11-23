import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COMPTE_DETAILS } from "../graphql/queries";
import { ADD_TRANSACTION } from "../graphql/mutations";
import styled from "styled-components";

const CompteDetails = ({ compteId }) => {
  const { loading, error, data, refetch } = useQuery(GET_COMPTE_DETAILS, {
    variables: { compteId },
  });

  const [addTransaction, { loading: mutationLoading }] = useMutation(ADD_TRANSACTION);
  const [formData, setFormData] = useState({
    montant: "",
    date: "",
    type: "DEPOT",
  });

  if (loading) return <Message>Loading...</Message>;
  if (error) return <Message>Error: {error.message}</Message>;

  const compte = data.compteById;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction({
        variables: {
          transaction: {
            compteId,
            montant: parseFloat(formData.montant),
            date: formData.date,
            type: formData.type,
          },
        },
      });
      setFormData({ montant: "", date: "", type: "DEPOT" }); // Reset form
      refetch(); // Refresh transactions
      alert("Transaction added successfully!");
    } catch (err) {
      console.error("Error adding transaction:", err.message);
      alert("Failed to add transaction. Please try again.");
    }
  };

  return (
    <CompteContainer>
      <Title>Account Details</Title>
      <Details>
        <DetailItem><strong>ID:</strong> {compte.id}</DetailItem>
        <DetailItem><strong>Type:</strong> {compte.type}</DetailItem>
        <DetailItem><strong>Balance:</strong> {compte.solde}</DetailItem>
        <DetailItem><strong>Date Created:</strong> {compte.dateCreation}</DetailItem>
      </Details>

      <TransactionForm onSubmit={handleFormSubmit}>
        <SubTitle>Add a Transaction</SubTitle>
        <FormGroup>
          <label htmlFor="montant">Amount:</label>
          <Input
              type="number"
              name="montant"
              id="montant"
              value={formData.montant}
              onChange={handleInputChange}
              required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="date">Date:</label>
          <Input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
              required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="type">Transaction Type:</label>
          <Select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleInputChange}
              required
          >
            <option value="DEPOT">Deposit</option>
            <option value="RETRAIT">Withdrawal</option>
          </Select>
        </FormGroup>
        <SubmitButton type="submit" disabled={mutationLoading}>
          {mutationLoading ? "Processing..." : "Add Transaction"}
        </SubmitButton>
      </TransactionForm>

      <TransactionList>
        <SubTitle>Transactions:</SubTitle>
        {compte.transactions.length > 0 ? (
            <TransactionItems>
              {compte.transactions.map((tx) => (
                  <TransactionItem key={tx.id}>
                    <p><strong>Type:</strong> {tx.type}</p>
                    <p><strong>Amount:</strong> {tx.montant}</p>
                    <p><strong>Date:</strong> {tx.date}</p>
                  </TransactionItem>
              ))}
            </TransactionItems>
        ) : (
            <Message>No transactions available for this account.</Message>
        )}
      </TransactionList>
    </CompteContainer>
  );
};

// Styled Components

const CompteContainer = styled.div`
  margin: 30px auto;
  padding: 25px;
  max-width: 650px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  color: #2c3e50;
  font-family: 'Arial', sans-serif;
`;

const SubTitle = styled.h3`
  margin-bottom: 20px;
  color: #34495e;
  font-size: 20px;
`;

const Details = styled.div`
  margin-bottom: 25px;
`;

const DetailItem = styled.p`
  font-size: 18px;
  color: #555;
`;

const TransactionForm = styled.form`
  background-color: #ffffff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    border-color: #7798db;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    border-color: #9798db;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 14px 24px;
  background-color: #9898db;
  color: white;
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

  &:disabled {
    background-color: #d0d0d0;
    cursor: not-allowed;
  }
`;

const TransactionList = styled.div`
  margin-top: 30px;
`;

const TransactionItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TransactionItem = styled.li`
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #e4e9f2;
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 16px;
  color: #888;
`;

export default CompteDetails;
