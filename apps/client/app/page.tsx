import { PostCreate } from "~/components/post-create"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <p className="text-muted-foreground max-w-[700px] text-lg sm:text-xl">
          The aim of this app is to see the concepts of microservices
          architecture applied in a simple way.
        </p>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Create a post <br className="hidden sm:inline" />
        </h1>
        <PostCreate />
      </div>
    </section>
  )
}
