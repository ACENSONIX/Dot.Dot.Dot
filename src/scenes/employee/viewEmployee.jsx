import { useState } from "react";
import { Typography, Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const ViewEmployee = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [Employee, setEmployee] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    location: "Mumbai",
    phone: "9783568746",
    address: "Somewhere Sometime something someone all at nonce",
    dob: "2023-02-02",
    zip: "400067",
  });

  return (
    <Box
      p='1rem 0'
      display='grid'
      gap='1em 2em'
      gridTemplateColumns='repeat(15,1fr)'
      position='relative'>
      <img class='cover-image' src='http://unsplash.it/seed/person/1600/400' alt='cover' />
      <Box
        borderRadius='50%'
        width='10rem'
        height='10rem'
        border='4px solid #fff'
        gridRow='2 / span 2'
        gridColumn='2 / span 2'
        sx={{
          "&>img": { width: "100%", height: "100%", aspectRatio: "1/1", borderRadius: "50%" },
        }}>
        <img src='http://unsplash.it/seed/person/200/200' alt='profile' />
      </Box>
      <Typography
        variant='h1'
        color={colors.grey[100]}
        fontWeight='bold'
        gridColumn='4 / -1'
        gridRow='3'
        fontSize='4rem'>
        {Employee.firstName} {Employee.lastName}
      </Typography>
      <Box gridRow='4' gridColumn='1 / -1' display='grid' gap='0.5em' p='0 1rem'>
        <Typography variant='h3'>{Employee.email}</Typography>
        <Typography variant='h3'>{Employee.phone} </Typography>
        <Typography variant='body1'>{Employee.address}</Typography>
        <Typography variant='body1'>
          {Employee.location}-{Employee.zip}
        </Typography>
      </Box>
      <Box gridColumn='1 / -1'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, sed. Rem rerum omnis harum
        magnam ipsum, vitae voluptatem vero nulla recusandae distinctio explicabo inventore, totam
        voluptates quidem culpa, perspiciatis tempore id et cupiditate maiores tempora atque
        repellat dolore. Non dolor, labore eum aperiam eaque, ipsa reprehenderit quisquam debitis et
        ducimus est itaque eius accusamus odit a consectetur facilis perspiciatis fugit porro
        provident. Doloribus harum ullam culpa ipsum deserunt quis, optio, in deleniti rerum magnam
        accusantium beatae officiis maxime, quia exercitationem vero illum nobis itaque autem
        nesciunt dolores ea. Iste quam itaque maiores mollitia tempore consequatur voluptatibus sunt
        quis saepe veritatis ut dolorum laudantium, rerum provident ipsa odio maxime, sit dolorem
        libero nulla dolor, numquam magnam natus quos! Possimus, maiores accusamus! Aspernatur
        nesciunt, aut veritatis suscipit eos iste officiis illo aperiam quis nostrum temporibus
        voluptate nihil ex possimus iusto dolore recusandae quod. Dolorem ad voluptas molestiae
        labore dicta impedit deleniti voluptate eum numquam voluptatibus nobis, sit facere officia
        repudiandae sapiente itaque distinctio expedita. Assumenda quibusdam voluptates, quas sunt
        modi tempore explicabo molestias iste facere vero quam cum, repellendus mollitia quis
        ratione. Tempore esse eveniet rerum. Impedit magnam eligendi nisi minus ex illum quae
        perferendis consequuntur laborum voluptatem eius blanditiis ipsa, voluptates temporibus
        assumenda officiis! Fugit aut ut similique molestias necessitatibus animi eos. Quibusdam
        illo minus eveniet dicta natus voluptatum, amet quaerat? Sit, quos id itaque accusamus
        quidem vero deserunt illo incidunt laboriosam cupiditate. Deserunt autem impedit corrupti
        architecto ducimus officiis unde facilis, consequuntur aspernatur, ipsa pariatur delectus
        aut doloribus? Repellat, incidunt consequatur tenetur commodi odit modi nesciunt rerum vitae
        autem eius consectetur sint eum animi, quaerat necessitatibus quo fugiat atque, dicta quasi
        pariatur nulla accusantium asperiores repudiandae sunt? Officiis, repellat quia aliquam
        rerum accusantium hic consequuntur optio aspernatur blanditiis, sint commodi vel nemo?
        Dolorum, illo magni iste nulla blanditiis, quis incidunt sapiente at vel quaerat officiis,
        quia vitae ipsa fugiat? Laboriosam ea totam, architecto ducimus autem dolor, a
        necessitatibus iure dolorum reiciendis optio accusantium cum, repellat accusamus aliquam
        magnam tempore fuga eligendi. Dignissimos, consequatur ea! Similique, rerum dignissimos rem
        laudantium aliquid dolor, fugiat nemo saepe omnis possimus ducimus tempore aliquam assumenda
        blanditiis. Ipsa sapiente deleniti ex, nisi cum corporis repellendus praesentium quas magnam
        id et, unde laboriosam accusantium, similique excepturi iusto est perferendis. Deleniti,
        nobis consectetur voluptatum aperiam ipsam, repudiandae doloribus voluptates eaque eius,
        harum recusandae. Saepe fuga deleniti iste natus facere officiis incidunt odio ea
        dignissimos commodi ipsa qui accusamus veniam dicta at eligendi a ad sequi aliquid itaque
        in, quaerat neque. Nobis minus expedita laboriosam natus dignissimos facere distinctio
        adipisci, doloribus, ea labore doloremque eius! Aliquam ab veritatis deserunt itaque
        accusamus placeat eaque minus ea odit! Nobis illum, eum minima aperiam accusamus dolorum.
        Adipisci consequatur est blanditiis delectus vero? Qui mollitia totam fugit optio quidem
        quia quas libero quibusdam provident cumque pariatur est maiores voluptatem dolorem sapiente
        autem, modi odio alias dolore aspernatur dolorum ut. Laborum nisi error, ex doloremque saepe
        veniam nobis ipsa! At tempora dignissimos, rerum omnis quas facere eveniet eaque ea dolorem
        aperiam, illo nemo suscipit!
      </Box>
      <Box
        position='sticky'
        bottom='0'
        gridAutoFlow='column'
        display='grid'
        gridAutoColumns='1fr'
        gap='1rem'
        gridColumn='1 / -1'
        gridRow='100'
        padding='1rem'
        backgroundColor='rgba(0 0 0 / 0.7)'
        backdropFilter='blur(20px)'>
        <Button
          sx={{
            backgroundColor: colors.greenAccent["600"],
            fontWeight: "bold",
            fontSize: "1.25em",
            color: colors.primary["900"],
            "&:hover": {
              backgroundColor: colors.greenAccent["400"],
            },
          }}>
          Green
        </Button>
        <Button
          sx={{
            backgroundColor: colors.yellowAccent["600"],
            fontSize: "1.25em",
            fontWeight: "bold",
            color: colors.primary["900"],
            "&:hover": {
              backgroundColor: colors.yellowAccent["400"],
            },
          }}>
          Orange
        </Button>
        <Button
          sx={{
            backgroundColor: colors.orangeAccent["600"],
            fontSize: "1.25em",
            fontWeight: "bold",
            color: colors.primary["900"],
            "&:hover": {
              backgroundColor: colors.orangeAccent["400"],
            },
          }}>
          Yellow
        </Button>
        <Button
          sx={{
            backgroundColor: colors.redAccent["600"],
            fontSize: "1.25em",
            fontWeight: "bold",
            color: colors.primary["900"],
            "&:hover": {
              backgroundColor: colors.redAccent["400"],
            },
          }}>
          Red
        </Button>
      </Box>
    </Box>
  );
};
export default ViewEmployee;
