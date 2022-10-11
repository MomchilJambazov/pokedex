import { useEffect, useState, useCallback } from 'react';
import Tree from 'react-d3-tree';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import styles from './index.module.scss';

const TREE_HEIGHT = 350;

interface PokemonEvolutionGraphProps {
  name: string;
  evolutionChainUrl: string;
}

interface NodeProps {
  nodeDatum: any;
  toggleNode: any;
  handleNodeClick: any;
}

function PokemonEvolutionGraph({
  name,
  evolutionChainUrl,
}: PokemonEvolutionGraphProps) {
  const [dataTree, setDataTree] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const evolutionId = evolutionChainUrl
    ?.split('/')
    ?.filter((e) => Number.isInteger(parseInt(e, 10)))[0];
  const evolutionQuery = useQuery(
    ['evolution', evolutionId],
    () => fetch(evolutionChainUrl).then((r) => r.json()),
    { retry: 2, staleTime: Infinity },
  );

  const evolutionChain = evolutionQuery?.data?.chain;

  const generateTree = useCallback(async (chain: any) => {
    if (!chain?.species) return null;
    setLoading(true);
    const speciesData = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${chain?.species.name}`,
    ).then((r) => r.json());
    const children = await Promise.all(
      chain?.evolves_to?.map((c: any) => generateTree(c)),
    );

    return {
      name: chain?.species?.name,
      image: speciesData.sprites.other['official-artwork'].front_default,
      children,
    };
  }, []);

  useEffect(() => {
    if (evolutionChainUrl) {
      generateTree(evolutionChain)
        .then((r) => setDataTree(r))
        .finally(() => setLoading(false));
    }
  }, [name, evolutionChainUrl, evolutionChain, generateTree]);

  const handleNodeClick = (nodeDatum: any) => {
    navigate(`/pokemon/${nodeDatum.name}`);
  };

  const renderNodeWithCustomEvents = ({
    nodeDatum,
    handleNodeClick,
  }: NodeProps) => (
    <g>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1976d2" />
          <stop offset="100%" stopColor="#5eaefd" />
        </linearGradient>
        <pattern
          id={nodeDatum.name || 'image'}
          x="0%"
          y="0%"
          height="100%"
          width="100%"
          viewBox="0 0 32 32"
        >
          <image
            xlinkHref={`${nodeDatum?.image}`}
            width="32"
            height="32"
            x="0%"
            y="0%"
          />
        </pattern>
      </defs>
      <circle
        fill={`url(#${nodeDatum.name})`}
        r="64"
        strokeWidth={name === nodeDatum.name ? 10 : 0}
        stroke="url(#gradient)"
        onClick={() => handleNodeClick(nodeDatum)}
      />
      <text
        fill="black"
        strokeWidth="1"
        x="-30"
        y="90"
        onClick={() => handleNodeClick(nodeDatum)}
        style={{ textTransform: 'capitalize' }}
      >
        {nodeDatum.name}
      </text>
    </g>
  );

  if (evolutionQuery.isError) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return (
      <Box sx={{ p: 15 }}>
        <Typography sx={{ textAlign: 'center', mb: 2 }}>
          Generating evolution graph
        </Typography>
        <LinearProgress />
      </Box>
    );
  }
  if (!dataTree || !evolutionChainUrl) return null;

  return (
    <>
      <Typography sx={{ textAlign: 'center', mt: 5 }} variant="h6">
        Evolution tree
      </Typography>
      <div
        id="treeWrapper"
        style={{ width: '100%', height: `${TREE_HEIGHT}px` }}
      >
        <Tree
          data={dataTree}
          collapsible={false}
          nodeSize={{ x: 200, y: TREE_HEIGHT / 2 - 10 }}
          translate={{ x: 180, y: TREE_HEIGHT / 2 - 10 }}
          pathClassFunc={() => styles.baba}
          renderCustomNodeElement={(rd3tProps) => renderNodeWithCustomEvents({ ...rd3tProps, handleNodeClick })}
          zoomable={false}
        />
      </div>
    </>
  );
}

export default PokemonEvolutionGraph;
