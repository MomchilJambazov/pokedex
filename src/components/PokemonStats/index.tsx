/* eslint-disable max-len */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

export default function PokemonStats({ stats }: {stats: any}) {
  if (!stats) return null;

  // Formulas taken from wiki (https://pokemon.fandom.com/wiki/Statistics), max IV value 31, max EV value is 255
  const computeMinHpLimit = (baseStat:number) => Math.floor(Math.floor(0.01 * (2 * baseStat + 0 + Math.floor(0.25 * 0)) * 100) + 100 + 10);
  const computeMaxHpLimit = (baseStat:number) => Math.floor(Math.floor(0.01 * (2 * baseStat + 31 + Math.floor(0.25 * 255)) * 100) + 100 + 10);
  const computeMinStatLimit = (baseStat:number) => Math.floor((Math.floor(0.01 * (2 * baseStat + 0 + Math.floor(0.25 * 0)) * 100) + 5) * 0.9);
  const computeMaxStatLimit = (baseStat:number) => Math.floor((Math.floor(0.01 * (2 * baseStat + 31 + Math.floor(0.25 * 255)) * 100) + 5) * 1.1);

  const deriveMinLimit = (statName:string, baseValue:number) => (statName === 'hp' ? computeMinHpLimit(baseValue) : computeMinStatLimit(baseValue));
  const deriveMaxLimit = (statName:string, baseValue:number) => (statName === 'hp' ? computeMaxHpLimit(baseValue) : computeMaxStatLimit(baseValue));
  return (
    <>
      <Typography sx={{ mt: 3 }} variant="h6">Base Stats</Typography>
      <TableContainer component={Paper} sx={{ boxShadow: '0 5px 10px #d0efef' }}>
        <Table size="small" aria-label="a dense table">
          <TableFooter sx={{ background: '#e7ecf0' }}>
            <TableRow>
              <TableCell sx={{ textAlign: 'right' }}>
                <b>Total:</b>
              </TableCell>
              <TableCell>
                <b>
                  {stats.reduce((acc:number, stat: any) => acc + stat.base_stat, 0)}
                </b>
              </TableCell>
              <TableCell />
              <TableCell>Min</TableCell>
              <TableCell>Max</TableCell>
            </TableRow>
          </TableFooter>
          <TableBody>
            {stats.map(({ base_stat: baseStat, stat: { name } }: any) => (
              <TableRow
                key={name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ textTransform: 'capitalize', width: '140px' }} component="th" scope="row">
                  {name.replace('-', ' ')}
                </TableCell>
                <TableCell sx={{ width: '40px' }}>{baseStat}</TableCell>
                <TableCell><LinearProgress sx={{ height: '15px' }} variant="determinate" value={(baseStat / deriveMaxLimit(name, baseStat)) * 100} /></TableCell>
                <TableCell sx={{ width: '40px' }}>{deriveMinLimit(name, baseStat)}</TableCell>
                <TableCell sx={{ width: '40px' }}>{deriveMaxLimit(name, baseStat)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
