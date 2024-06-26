import PromptCard from "@components/promptcard";
import Image from "next/image";


const Profile = ({ name, image, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full flex flex-col mt-8">
       <Image
            src={image}
            alt="user_image"
            width={80}
            height={80}
            className="rounded-full object-contain self-start"
          ></Image>
      <h1 className="head_text text-left">
        <span className="blue_gradient capitalize">{name}</span>
      </h1>
      <p className="font-satoshi font-semibold text-gray-600">{desc}</p>

      <div className="mt-8 prompt_latout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
