function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

var last_id = db.questions.find({info_job_id: { $exists: true }}).sort({info_job_id: -1}).limit(1)[0].info_job_id;

db.questions.find({info_job_id: { $exists: false }}).forEach(
  function(doc){ 
    last_id++; 
    doc.info_job_id = last_id;
    var order = shuffle([1,2,3,4]);
    for (var i = 0; i < doc.answers.length; i++) {
      doc.answers[i].order = order[i];
    }
    db.questions.update({"_id": doc._id}, doc);
  }
);