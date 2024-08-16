export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="pt-2">
      <div className="overflow-hidden h-2 mb-4 flex rounded bg-evmos-dark">
        <div
          style={{ width: `${progress}%` }}
          className="bg-evmos-secondary rounded"
        ></div>
      </div>
    </div>
  );
}
