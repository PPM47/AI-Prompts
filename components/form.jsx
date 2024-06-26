import Link from "next/link";

const Form = ({ type, classN, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="form-sec flex-start">
      <h1 className="head_text text-left">
        <span className={classN}>{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full dropSm max-w-4xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your post here"
            required
            className="form_textarea dropSs"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#Tag"
            required
            className="form_input dropSs"
          />
        </label>
        <div className="flex-between mx-3 mb-5 gap-4">
          <button href={"/"} className="form_post glassmorphism dropSm ">
            <span className="blue_gradient">
              {submitting ? `${type}...` : type}
            </span>
          </button>
          <Link
            href={"/"}
            type="submit"
            disabled={submitting}
            className="form_cancel glassmorphism "
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Form;
