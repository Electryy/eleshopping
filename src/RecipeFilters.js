import React from "react";

function RecipeFilters(props) {
  const { parentCall, filterString, filterTags, tagCloud } = { ...props };

  function filterRecipes(e) {
    parentCall.setFilterString(e.target.value);
  }

  function tagClick(e) {
    const clickTag = e.target.textContent;
    let filterTagsCpy = [...filterTags];

    // if clicked tag is already clicked -> unclick it
    // else add it to filters
    if (filterTagsCpy.includes(clickTag)) {
      filterTagsCpy = filterTagsCpy.filter((i) => i !== clickTag);
    } else {
      filterTagsCpy.push(clickTag);
    }
    parentCall.setFilterTags(filterTagsCpy);
    parentCall.refreshTagCloud();
  }

  function isTagInEffect(tag) {
    return filterTags.includes(tag);
  }

  function hideClearBtn() {
    // If both filters are empty
    return filterTags.length === 0 && filterString.length === 0;
  }

  function clearFilters() {
    parentCall.setFilterString("");
    parentCall.setFilterTags([]);
  }

  return (
    <>
      <div className="relative">
        <input type="text" placeholder="Filter" className="input input-lg input-bordered grow w-full mb-6" value={filterString} onChange={filterRecipes} />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tagCloud.map((tag, index) => (
          <button key={index} className={`btn btn-sm btn-secondary transition-none animate-none ${isTagInEffect(tag) ? "" : "btn-outline"} `} onClick={tagClick}>
            {tag}
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <button className={`block link link-accent link-hover uppercase mb-4 text-sm ${hideClearBtn() ? "hidden" : ""}`} onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </>
  );
}

export default RecipeFilters;
