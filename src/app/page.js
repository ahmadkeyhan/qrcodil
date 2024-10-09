import { testDatabaseConnection } from "../actions/connect";

export default async function Home() {
  const isConnected = await testDatabaseConnection();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      {isConnected ? (
          <h2 className="text-lg text-green-500">
            You are connected to MongoDB!
          </h2>
        ) : (
          <h2 className="text-lg text-red-500">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
            for instructions.
          </h2>
        )}
      </main>

    </div>
  );
}
