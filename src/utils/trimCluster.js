import moment from 'moment-timezone';

const trimCluster = (cluster) => {
  // Parse sentences
  const summaries = cluster.summary;
  let points = [ ];
  for (let i = 0; i < summaries.length; i ++) {
    const summary = summaries[i];
    for (let j = 0; j < summary.sentences.length; j ++) {
      points.push(summary.sentences[j]);
    }
  }
  return {
    clusterId: cluster._id,
    points,
    summary_title: cluster.title,
    score: cluster.score,
    date_written: moment().tz('America/New_York').format('LL'), // June 20, 2018
  }
}

export default trimCluster;