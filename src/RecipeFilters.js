import React from "react";

function RecipeFilters(props) {
  const { parentCall, filterString, tagCloud } = { ...props };

  function filterRecipes(e) {
    parentCall.setFilterString(e.target.value);
  }

  function tagClick(e) {
    const clickTag = e.target.dataset.tagname;
    let tag = tagCloud.find((i) => i.name === clickTag);
    tag.filterOn = !tag.filterOn;
    parentCall.refreshTagCloud();
  }

  function hideClearBtn() {
    // If both filters are empty
    const filterTags = tagCloud.filter((i) => i.filterOn);
    return filterTags.length === 0 && filterString.length === 0;
  }

  function clearFilters() {
    parentCall.setFilterString("");

    const tagCloudReseted = tagCloud.map((i) => {
      i.filterOn = false;
      return i;
    });
    parentCall.setTagCloud(tagCloudReseted);
  }

  return (
    <>
      <div className="relative">
        <input type="text" placeholder="Filter" className="input input-lg input-bordered grow w-full mb-6" value={filterString} onChange={filterRecipes} />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tagCloud.map((tag, index) => (
          <button key={index} data-tagname={tag.name} className={`btn btn-sm btn-secondary transition-none animate-none ${tag.filterOn ? "" : "btn-outline"} `} onClick={tagClick}>
            {tag.name} {tag.count}
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
