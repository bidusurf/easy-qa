db.questions.find({info_job_id: { $exists: false }}).forEach(
  function(doc){ 
    last_id++; 
    doc.info_job_id = last_id; 
    db.questions.update({"_id": doc._id}, doc);
  }
);