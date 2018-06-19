//@flow
import axios from 'axios';

// Connect to DB

// Types for flow
type summarizerOptions = {
  title: string,
  text: string,
  summary_length: number,
  coref: boolean,
  sort_by_salience: boolean,
  include_all_sentences: boolean,
}

function agolo() {
  this.summarizer = {
    summarize: async (options: summarizerOptions) => {
      // Prepare options for summarizing
      const { title, text, summary_length, coref, sort_by_salience, include_all_sentences } = options;
      const article = { title, text };
      const summarizer_options = {
        summary_length,
        articles: [article],
        coref,
        sort_by_salience,
        include_all_sentences,
      };
      // Request for Agolo's API
      const AgoloAxios = axios.create({
        baseURL: process.env.AGOLO_URL,
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': process.env.AGOLO_API_KEY,
        }
      });
      // Make request to Agolo Summarizer API & return
      const response = await AgoloAxios.post('/', summarizer_options);
      return ({ summary_title: response.data.title, summary_points: response.data.summary[0].sentences });
    },
  }
}

const Agolo = new agolo();
export default Agolo;
