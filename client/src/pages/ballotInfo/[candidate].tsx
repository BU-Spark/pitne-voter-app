// pages/ballotInfo/[candidate].tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Typography, Avatar, Container } from '@mui/material';

interface Candidate {
    name: string;
    affiliation: string;
    picture: string;
    bio: string;
}

// Example data source
const candidateData: { [key: string]: Candidate } = {
    JuliaMejia: {
        name: "Julia Mejia",
        affiliation: "Independent",
        picture: "/path/to/julia-mejia-picture.jpg",
        bio: "Biography of Julia Mejia..."
    },
    // Add more candidates here
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = Object.keys(candidateData).map(candidate => ({
        params: { candidate }
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { candidate } = context.params as { candidate: string };
    const candidateInfo = candidateData[candidate];

    return { props: { candidate: candidateInfo } };
};

const CandidatePage = ({ candidate }: { candidate: Candidate }) => {
    const router = useRouter();
    const { name, affiliation, picture, bio } = candidate;

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Avatar alt={name} src={picture} sx={{ width: 128, height: 128 }} />
            <Typography variant="h3" component="h1">
                {name}
            </Typography>
            <Typography variant="h5" component="h2">
                {affiliation}
            </Typography>
            <Typography variant="body1" component="p">
                {bio}
            </Typography>
        </Container>
    );
};

export default CandidatePage;
