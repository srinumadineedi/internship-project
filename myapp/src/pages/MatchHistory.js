import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, TextField, Typography, TablePagination, IconButton, CircularProgress
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";

const MatchHistory = () => {
  const [matches, setMatches] = useState([]); // Store fetched match data
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch match history from backend (Later API)
  useEffect(() => {
    setLoading(true);
    
    // Simulating API call (Replace with real API later)
    setTimeout(() => {
      setMatches([]); // Initially, empty. Data will come from backend later.
      setLoading(false);
    }, 1000); // Simulating network delay
  }, []);

  // Filter matches based on search
  const filteredMatches = matches.filter((match) =>
    match.pet1.toLowerCase().includes(search.toLowerCase()) ||
    match.pet2.toLowerCase().includes(search.toLowerCase()) ||
    match.breed.toLowerCase().includes(search.toLowerCase()) ||
    match.owner.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ padding: 3, margin: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold", textAlign: "center" }}>
        🐾 Match History
      </Typography>

      {/* Search Input */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Matches (Pet, Breed, Owner)"
        InputProps={{
          endAdornment: <SearchIcon color="disabled" />,
        }}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Loading State */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
          <CircularProgress />
        </div>
      ) : (
        matches.length === 0 ? (
          <Typography textAlign="center" sx={{ padding: 2, fontStyle: "italic", color: "gray" }}>
            No match history found.
          </Typography>
        ) : (
          <>
            {/* Match History Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell><b>Pet 1</b></TableCell>
                    <TableCell><b>Pet 2</b></TableCell>
                    <TableCell><b>Breed</b></TableCell>
                    <TableCell><b>Owner</b></TableCell>
                    <TableCell><b>Match Date</b></TableCell>
                    <TableCell align="center"><b>Action</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMatches
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((match) => (
                      <TableRow key={match.id}>
                        <TableCell>{match.pet1}</TableCell>
                        <TableCell>{match.pet2}</TableCell>
                        <TableCell>{match.breed}</TableCell>
                        <TableCell>{match.owner}</TableCell>
                        <TableCell>{match.date}</TableCell>
                        <TableCell align="center">
                          <IconButton color="primary">
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              component="div"
              count={filteredMatches.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ marginTop: 2 }}
            />
          </>
        )
      )}
    </Paper>
  );
};

export default MatchHistory;
