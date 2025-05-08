import Menu from "@/container/menu/Menu";

const page = ({ params }: { params: { id: string } }) => {
  
  const { id } = params;

  console.log("id: ", id);

  return (
    <Menu />
    // <div>
    //   this is menu page ............
    // </div>
  );
};

export default page;
