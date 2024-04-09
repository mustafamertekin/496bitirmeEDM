import { Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { doc, updateDoc, arrayUnion, arrayRemove, setDoc, getDoc } from "firebase/firestore";
import { auth,db } from '../firebase/firebase';

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableTitle = styled.h2`
  margin-bottom: 10px;
  color: white;
`;

const TableRow = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => (props.selected ? '#e35a5a' : 'transparent')};
`;

const TableCell = styled.div<{ flex?: number }>`
  flex: ${(props) => props.flex || 1};
  padding: 10px;
  color: white;
  min-width: 80px; /* Adjust the minimum width as needed */
`;


const CheckboxInput = styled.input`
  margin: 0;
`;

const Text = styled.span<{ size?: string; fw?: number }>`
  font-size: ${(props) => props.size || 'inherit'};
  font-weight: ${(props) => props.fw || 'inherit'};
`;


export const MyTable: React.FC<{ title: string; names: string[] }> = ({ title, names: initialNames }) => {
  const [names, setNames] = useState<string[]>(initialNames); // State to manage names array
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const deleteSelectedRows = () => {
    const filteredNames = names.filter((name, index) => !selectedRows.includes(index));
    setNames(filteredNames); // Update the names array
    setSelectedRows([]); // Clear selected rows
  };

  return (
    <TableContainer>
      <TableTitle>{title}</TableTitle>
      {names.map((name, index) => (
        <TableRow key={index} selected={selectedRows.includes(index)}>
          <TableCell flex={0.1}>
            <CheckboxInput
              type="checkbox"
              checked={selectedRows.includes(index)}
              onChange={() => toggleRow(index)}
            />
          </TableCell>
          <TableCell flex={2}>
            <div style={{ display: 'flex', alignItems: 'center'}}>
              <Text size="small" fw={500}>
                {name}
              </Text>
            </div>
          </TableCell>
        </TableRow>
      ))}
      <Button onClick={deleteSelectedRows} style={{ marginTop: '10px' }}>Seçili satırları profilimden sil</Button>
    </TableContainer>
  );
};


const headerBlue = '#1F2D5A';

export default function ProfileInfo() {
  // Data for the table
  const [songs, setSongs] = useState(['Diamonds', 'Whistle', 'Kara Toprak']);
  const [artists, setArtists] = useState(['Tarkan', 'Adele', 'Sam Smith']);
  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, "Users", auth.currentUser!.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        if (userData) {
          setSongs(userData.likedSongs || []);
          setArtists(userData.likedArtists || []);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("Updated Songs:", songs);
  }, [songs]);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', background: '#1F2D5A'  }}>
      <div style={{ display: 'flex', gap: '450px' }}>
        <MyTable title="Beğenilen Şarkılar"  names={songs} />
        <MyTable title="Beğenilen Sanatçılar"  names={artists} />
      </div>
    </div>
  );
}
function getNote() {
  throw new Error('Function not implemented.');
}

