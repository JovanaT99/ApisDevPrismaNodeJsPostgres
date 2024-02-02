import {PrismaClient} from "@prisma/client";

const prisma = new  PrismaClient();

async function main() {

    //queries here
    //insert into course table
// const course= await prisma.course.create({

// data:{
//     title:"Learn GatsbyJs",
//     desc:"Step by Step nearn how to use Gatsby",
//     durration: 3.5
//     }
// })
// console.log(course);

const courses = await prisma.course.findMany();
console.log(courses);

// const video = await  prisma.video.create({

//     data:{
//             title:"Learn relation",
//             desc:"One to many relation beetween model",
//             url: "www.aws.w3.com/2131231",
//             courseId: 1
//             }

// })
// console.log(video);

const videos = await prisma.video.findMany({include:{Course:{}}});
console.log(videos);
}

//lazy loading
main()
    .then(async () =>{
        await prisma.$disconnect()
    })

    .catch(async (e)=>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
    })