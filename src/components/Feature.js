import React, { Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
  const { searchTerm, searchValue, setIsLoading, setSearchResults } = props;
  return (
    <span className="content">
    <a href="#" onClick={async (event) => {
        event.preventDefault();
        setIsLoading(true);
      try {
        const result = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
        setSearchResults(result);
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    }}>{searchValue}</a>
    </span>
  )

}

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */
const Feature = (props) => {
  const { setIsLoading, setSearchResults } = props;
  const { title, dated, images, primaryimageurl, description, culture, style, technique, medium, dimensions, people, department, division, contact, creditline } = props.featuredResult;
  console.log(props);
  return props.featuredResult ? (
    <main id="feature">
      <div className="object-feature">
        <header>
          <h3>{title}</h3>
          <h4>{dated}</h4>
        </header>
        <section className="facts">
          <Fragment>
            <span className="title">{title ? 'Title' : ''}</span>
            <span className="content">{title ? title : ''}</span>
          </Fragment>
          <Fragment>
            <span className="title">{description ? 'Description' : ''}</span>
            <span className="content">{description ? description : ''}</span>
          </Fragment>
          <Fragment>
            <span className="title">{culture ? "Culture" : ''}</span>
            <Searchable setSearchResults={setSearchResults} setIsLoading={setIsLoading} searchValue={culture} searchTerm="culture"/>
          </Fragment>
          <Fragment>
            <span className="title">{style ? "Style" : ''}</span>
            <span className="content">{style ? style : ''}</span>
          </Fragment>
          <Fragment>
            <span className="title">{technique ? "Technique" : ''}</span>
            <Searchable setSearchResults={setSearchResults} setIsLoading={setIsLoading} searchValue={technique} searchTerm="technique"/>
          </Fragment>
          <Fragment>
            <span className="title">{medium ? "Medium" : ''}</span>
            <Searchable setSearchResults={setSearchResults} setIsLoading={setIsLoading} searchValue={medium} searchTerm="medium" />
          </Fragment>
          <Fragment>
            <span className="title">{dimensions ? "Dimensions" : ''}</span>
            <span className="content">{dimensions ? dimensions : ''}</span>
          </Fragment>
          <Fragment>
            {people ? people.map((person, index) => {
              return (
                <Fragment key={index}>
                  <span className="title">{people ? "Person" : ''}</span>
                  <Searchable setSearchResults={setSearchResults} searchValue={person.displayname} searchTerm="person" setIsLoading={setIsLoading} />
                </Fragment>
              )
            }): null}  
          </Fragment>
          <Fragment>
            <span className="title">{department ? "Department" : ''}</span>
            <span className="content">{department ? department : ''}</span>
          </Fragment>
          <Fragment>
            <span className="title">{division ? "Division" : ''}</span>
            <span className="content">{division ? division : ''}</span>
          </Fragment>
          <Fragment>
            <span className="title">{contact ? "Contact" : ''}</span>
            <span className="content">{contact ? contact : ''}</span>
          </Fragment>
          <Fragment>
            <span className="title">{creditline ? "Credit Line" : ''}</span>
            <span className="content">{creditline ? creditline : ''}</span>
          </Fragment>
        </section>
        <section className="photos">
          {/* <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE /> */}
          {images ? images.map((image, index) =>
            <img key={index} src={primaryimageurl} />) : null}
        </section>
      </div>
    </main>
  ) : <main id="feature"></main>;

  
}

export default Feature;
