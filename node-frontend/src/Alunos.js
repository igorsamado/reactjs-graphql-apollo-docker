import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

const ALUNOS = gql`
  query GetAlunos {
    getAllAlunos {
      id
      nome
      email
      cpf
    }
  }
`;

const ADD_ALUNO = gql`
  mutation AddAlunoMutation($nome: String!, $email: String!, $cpf: String!) {
    addAluno(nome: $nome, email: $email, cpf: $cpf) {
      id
      nome
      email
      cpf
    }
  }
`;

const REMOVE_ALUNO = gql`
  mutation RemoveAlunoMutation($id: ID!) {
    removeAluno(id: $id) {
      id
      nome
      email
      cpf
    }
  }
`;

const columns = [
  { field: "id", headerName: "ID", width: 400 },
  { field: "nome", headerName: "Nome", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "cpf", headerName: "CPF", width: 300 },
  { field: "acoes", headerName: "Ações", width: 150 },
];

function Alunos(props) {
  const [alunos, setAlunos] = useState([]);
  const [aluno, setAluno] = useState({ nome: "", email: "", cpf: "" });
  const [openDialog, setDialogOpen] = React.useState(false);
  const {
    loading: loadingAlunos,
    error: errorAlunos,
    data: alunosQueryData,
  } = useQuery(ALUNOS);
  const [
    addAluno,
    { loading: loadingAddAluno, error: errorAddAluno, data: dataAddAluno },
  ] = useMutation(ADD_ALUNO, {
    refetchQueries: [ALUNOS, "GetAlunos"],
  });
  const alunosData = !loadingAlunos ? alunosQueryData.getAllAlunos : [];

  useEffect(() => {
    setAlunos(alunosData);
  }, [alunosData]);

  if (loadingAlunos) {
    return <div>Loading...</div>;
  }

  if (loadingAddAluno) {
    return <div>Salvando...</div>;
  }

  if (errorAlunos) {
    console.error(errorAlunos);
    return <div>Error!</div>;
  }

  const handleClickOpen = () => {
    setAluno({});
    setDialogOpen(true);
  };

  const handleClickSalvar = () => {
    const { nome, email, cpf } = aluno;
    addAluno({ variables: { nome, email, cpf } });
    setDialogOpen(false);
  };

  const handleClickRemover = () => {
    
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={alunos}
          columns={columns}
          pageSize={50}
          rowsPerPageOptions={[50]}
        />
      </div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Adicionar Aluno
      </Button>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Adicionar Aluno</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="nome"
            label="Nome"
            type="text"
            fullWidth
            variant="outlined"
            value={aluno.nome}
            onChange={(e) => setAluno({ ...aluno, nome: e.target.value })}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={aluno.email}
            onChange={(e) => setAluno({ ...aluno, email: e.target.value })}
          />
          <TextField
            margin="dense"
            id="cpf"
            label="CPF"
            type="text"
            fullWidth
            variant="outlined"
            value={aluno.cpf}
            onChange={(e) => setAluno({ ...aluno, cpf: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="outlined" onClick={handleClickSalvar}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Alunos;
