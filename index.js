function getSolutions(value) {
  const buildings = [
    { name: "T", time: 5, profit: 1500 },
    { name: "P", time: 4, profit: 1000 },
    { name: "C", time: 10, profit: 2000 },
  ];

  let maxProfit = 0;
  let answers = [];

  function dfs(currentTime, totalProfit, counts) {
    let canBuild = false;

    for (const b of buildings) {
      const finishTime = currentTime + b.time;

      if (finishTime <= value) {
        canBuild = true;

        const earned =
          (value - finishTime) * b.profit;

        counts[b.name]++;

        dfs(
          finishTime,
          totalProfit + earned,
          counts
        );

        counts[b.name]--;
      }
    }

    if (!canBuild) {
      if (totalProfit > maxProfit) {
        maxProfit = totalProfit;
        answers = [{ ...counts }];
      } else if (totalProfit === maxProfit) {
        answers.push({ ...counts });
      }
    }
  }

  dfs(0, 0, { T: 0, P: 0, C: 0 });

  return {
    maxProfit,
    answers,
  };
}